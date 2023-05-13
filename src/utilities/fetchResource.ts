const baseUrl = "http://localhost:6969/";

/**
 * Fetches a resource asynchronously from the server and sets the state to the fetched data
 * @param resource The resource to fetch from the server (e.g. "users" would call http://localhost:6969/users)
 * @param setState the function that changes the state that will hold the fetched data
 */
export const fetchResource = async (resource: string, setState: (arg: any) => void) => {
    fetch(baseUrl + resource)
            .then((response) => response.json())
            .then((json) => setState(json))
            .catch((err) => console.log(err));
};