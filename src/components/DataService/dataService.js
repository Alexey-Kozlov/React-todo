export default class DataService {
    _apiBase = "http://localhost:5000/api";
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }
    getNote = async (id) => {
        const _promise = await this.getResource(`/GetNotes/${id}`);
        return _promise.map(this._mapNote);
    }
    addNote = async (newNote) => {
        const res = await fetch(`${this._apiBase}/AddNote`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._unMapNote(newNote))
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/AddNote, received ${res.status}`);
        }
        const _promise = await res.json();
        return _promise.map(this._mapNote); 
    }
    deleteNote = async (id) => {
        const formData  = new FormData();
        formData.append("id", id);
        const res = await fetch(`${this._apiBase}/DeleteNote`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/DeleteNote, received ${res.status}`);
        }
        const _promise = await res.json();
        return _promise.map(this._mapNote); 
    }
    updateNote = async (updateNote) => {
        const res = await fetch(`${this._apiBase}/UpdateNote`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._unMapNote(updateNote))
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/UpdateNote, received ${res.status}`);
        }
        const _promise = await res.json();
        return _promise.map(this._mapNote); 
    }
    _mapNote = (noteRec) => {
        return {
            id: noteRec.id,
            label: noteRec.topic,
            important: noteRec.important,
            done: noteRec.done
        }
    }
    _unMapNote = (noteRec) => {
        return {
            ID: noteRec.id,
            Topic: noteRec.label,
            Important: noteRec.important,
            Done: noteRec.done
        }
    }
}