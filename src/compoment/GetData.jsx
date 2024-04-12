const getData = async (userId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
const patchData = async (taskId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
            // mode: "no-cors",
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "*",
                // "cache-control": "no-cache",
                // "Access-Control-Allow-Header": "*",
            },
            body: JSON.stringify({ "completed": true })
        });
        if (!response.ok) {
            throw new Error("Failed to patch data");
        }
        const patchedData = await response.json();
        // console.log("Patched data:", patchedData);
        return patchedData;
    } catch (error) {
        console.error("Error patching data:", error);
        throw error;
    }
}

export { getData, patchData }