import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"
import LoadingIndicator from "../components/LoadingIndicator";

function Home() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
        console.log(notes);

    }, []);

    const getNotes = async () => {
        await api
            .get("api/notes/")
            .then((res) => res.data)
            .then((data) => setNotes(data))
            .catch((err) => alert(err));
        setIsLoading(false);
    };

    const deleteNote = async (id) => {
        await api
            .delete(`api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Note was Deleted");
                } else {
                    alert("Note was not Deleted");
                }
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const createNote = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post("api/notes/", {
                title,
                content
            });

            if (response.status === 201) {
                alert("Note created successfully");
                getNotes();
            } else {
                alert("Failed to create note");
            }
        } catch (error) {
            alert("An error occurred while creating the note");
        }
    };

    return (
        <div>
            <div>
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <div>
                        {notes.map((note) => (
                            <Note
                                key={note.id}
                                note={note}
                                onDelete={deleteNote}
                            />
                        ))}
                    </div>
                )}
            </div>
            <h2>Create A Note</h2>
            <form onSubmit={createNote}>
                <label>Title</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Content</label>
                <br />
                <textarea
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;