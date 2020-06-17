import React, { useState, useEffect, useRef } from 'react';
import { API, Storage } from 'aws-amplify';
import { onError } from '../libs/errorLib';
import { useParams, useHistory } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './Note.css';
import { s3Upload } from '../libs/awsLib';


export default function Notes() {

    const { id } = useParams();
    const history = useHistory();
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const file = useRef(null);

    useEffect(() => {
        function loadNote() {
            return API.get("notes", `/notes/${id}`);
        }

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                if (attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }
                setContent(content);
                setNote(note);
            } catch(e) {
                onError(e);
            }
        }
        onLoad();
    }, [id])

    function saveNote(note) {      
        return API.put("notes", `/notes/${id}`, {
            body: note
        });
    }

    function deleteNote() {
        return API.del("notes", `/notes/${id}`);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let attachment;

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert (`Please select a file with a size less than ${config.MAX_ATTACHMENT_SIZE}`);
            return;
        }

        setIsLoading(true);
        try {
            if (file.current) {                
                attachment = await s3Upload(file.current);
            }

            const response = await saveNote({
                content,
                attachment: attachment || note.attachment
            });
            console.log(response);
            history.push("/");
        } catch(e) {
            onError(e);
            setIsLoading(false);
        }                
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirm = window.confirm("Are you sure you want to delete this note?");

        if (!confirm) {
            return ;            
        }
        setIsDeleting(true);

        try{
            await deleteNote();
            history.push("/");
        } catch(e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function validateForm() {
        return content.length > 0;
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    return(
        <div className="Notes">
            {note && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            value={content}
                            componentClass="textarea"
                            onChange={e => setContent(e.target.value)}
                        />
                    </FormGroup>
                    {note.attachment && (
                        <FormGroup>
                            <ControlLabel>Attachment</ControlLabel>
                            <FormControl.Static>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={note.attachmentURL}
                                >
                                    {formatFilename(note.attachment)}
                                </a>
                            </FormControl.Static>
                        </FormGroup>
                    )}
                    <FormGroup controlId="file">
                        {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
                        <FormControl type="file" onChange={handleFileChange}/>
                    </FormGroup>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        bsStyle="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Update
                    </LoaderButton>
                    <LoaderButton
                        block
                        bsStyle="danger"                    
                        bsSize="large"
                        isLoading={isDeleting}
                        onClick={handleDelete}                     
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}


