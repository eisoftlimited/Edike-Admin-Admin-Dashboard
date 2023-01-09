export const fileUploadHandler = e => {
    console.log(e.target.files[0]);
    setSchoolProfile(e.target.files[0]);
    showPreview(e);
};
