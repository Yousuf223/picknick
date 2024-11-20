import store from '../redux';
import { BASE_URL } from "./WebService";

export const addProfilePicture = async (payload) => {
    const token = store?.getState()?.authReducer?.userToken;

    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        // const formData = new FormData();
        // formData.append('profile_picture', payload); // Assuming payload is a file or blob

        const response = await fetch(`https://gqtpw5tc-9900.inc1.devtunnels.ms/api/v1/users/me/upload-profile-picture`, {
            method: 'POST',
            body: payload,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                // Note: FormData sets the Content-Type header automatically
            },
        });

        const result = await response.json();
        if (response.ok) {
            return result; // Returning the result if successful
        } else {
            console.error('Failed to upload profile picture:', result);
            return null; // Or handle as needed
        }
    } catch (error) {
        console.error('Upload failed:', error);
        return null; // Or handle as needed
    }
}
