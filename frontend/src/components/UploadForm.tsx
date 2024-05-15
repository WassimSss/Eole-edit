import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { bytesToMegabytes } from '../modules/bytesToMegabytes';
interface UploadFormState {
    file: File | null;
}

class UploadForm extends Component<{}, UploadFormState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            file: null,
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        if (file) {

            this.setState({
                file: file,
            })
        }

        console.log("state : ", this.state);


    }

    handleSubmit = async () => {

        console.log("eee");
        
        if (!this.state.file) return;

        console.log("ooo");
        const formData = new FormData();

        formData.append('video', this.state.file);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    }

    render() {
        return (
            <Container>
                <h1 style={{ color: 'green' }}>Upload Video</h1>
                <Form >
                    <Form.Group controlId="formFile" className="mb-3 d-flex justify-content-center align-items-center">
                        <Form.Control type="file" onChange={this.handleChange} />
                    </Form.Group>
                    {this.state.file && (
                        <div>
                            <p>Name : {String(this.state.file.name)}Mo </p>
                            <p>Size : {String(bytesToMegabytes(this.state.file.size))}Mo </p>
                            <p>Type : {String(this.state.file.type)} </p>
                        </div>
                    )}
                    <Button variant="success" onClick={this.handleSubmit}>
                        Upload
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default UploadForm;