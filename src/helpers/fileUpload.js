export const fileUpload = async (file) => {
    if (!file) throw new Error("El archivo no existe");

    const cloudUrl = 'https://api.cloudinary.com/v1_1/esau-cursos/upload';
    const formdata = new FormData();
    formdata.append("upload_preset", 'journal');
    formdata.append("file", file);

    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formdata
        });

        if (!resp.ok) throw new Error("No se pudo subr imagen");

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        throw new Error(error.message);
    }
}