import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { onError } from '../libs/errorLib';
import config from '../config';
import './NewNote.css';
import { API } from 'aws-amplify';
import { s3Upload } from '../libs/awsLib';

export default function NewNote() {

    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const file = useRef(null);
    const history = useHistory();

    function validateForm() {
        return content.length > 0;
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();  
        
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick an smaller file than ${config.MAX_ATTACHMENT_SIZE} MB`);
        }

        setIsLoading(true);

        try {
            const attachment = file.current ? await s3Upload(file.current) : null;

            await createNote({ content, attachment });
            history.push("/");
        } catch(e) {
            console.log(e.toString());
            onError(e);
            setIsLoading(false);
        }
    }

    function createNote(note) {
        console.log(note);
        return API.post("notes", "/notes", {
            body: note
        });
    }

    return (
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                    <FormControl
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="file">
                    <ControlLabel>Attachment</ControlLabel>
                    <FormControl onChange={handleFileChange} type="file" />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </form>
        </div>
    );
}