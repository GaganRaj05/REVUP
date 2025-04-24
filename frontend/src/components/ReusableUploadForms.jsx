
const UploadForms = ({ formType, onClose }) => {
    return (
        <div className="upload-overlay">
            <div className="upload-content">
                <button className="upload-close-button" onClick={onClose}>✖</button>
                <form className="upload-form">
                    <input type="text" placeholder="Title" />
                    <input type="file" />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadForms;
