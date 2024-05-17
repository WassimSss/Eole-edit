import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { bytesToMegabytes } from '../modules/bytesToMegabytes';
import { toast, ToastContainer } from 'react-toastify';

interface UploadFormState {
    file: File | null;
    loading: boolean;
};

interface UploadFormProps {
    onUploadComplete: Function;
}

class UploadForm extends Component<UploadFormProps, UploadFormState> {

    // Initialize the state
    constructor(props: { onUploadComplete: Function }) {
        super(props);
        this.state = {
            file: null,
            loading: false
        }
    }

    /**
     * Handles the change event of the input element and set file to the file state.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
     */
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        if (file) {
            this.setState({
                file: file,
            })
        }
    }


    /**
     * Handles the form submission for uploading a file.
     */
    handleSubmit = async () => {
        // if there is no file, return
        if (!this.state.file) return;

        // if the loading state is true, return
        if (this.state.loading) {
            toast.info("Please wait for the current upload to finish");
            return;
        }

        const formData = new FormData();

        // append the file to the formData
        formData.append('video', this.state.file);

        try {
            // set the loading state to true before the request is done
            this.setState({ loading: true });

            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            // set the loading state to false after the request is done
            this.setState({ loading: false });

            if (data.result) {
                toast.success(data.message);
                this.props.onUploadComplete();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    }

    render() {
        return (
            <Container>
                <ToastContainer />
                <h1 style={{ color: 'green' }}>Upload Video</h1>
                <Form >
                    <Form.Group controlId="formFile" className="mb-3 d-flex justify-content-center align-items-center">
                        <Form.Control type="file" onChange={this.handleChange} />
                    </Form.Group>
                    {this.state.loading && <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                    {this.state.file && (
                        <div>
                            <p>Name : {String(this.state.file.name)}</p>
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