function fetchUserProfile() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: 'Kevin Bacons' });
        }, 1000);
    });
}

function fetchUserPosts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([{ id: 1, content: 'Post 1' }, { id: 2, content: 'Post 2' }]);
        }, 1500);
    });
}

function fetchCommentsWithError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject("Failed to fetch comments");
            } else {
                resolve([{ postId: 1, text: 'Comment 1' }, { postId: 2, text: 'Comment 2' }]);
            }
        }, 500);
    });
}

function sequentialFetch() {
    console.log("Starting sequential fetch...");

    fetchUserProfile()
        .then(profile => {
            console.log("User profile retrieved:", profile);
            return fetchUserPosts();
        })
        .then(posts => {
            console.log("Posts retrieved:", posts);
            return fetchCommentsWithError();
        })
        .then(comments => {
            console.log("Comments retrieved:", comments);
        })
        .catch(error => console.error("Error in sequential fetch:", error));
}

function parallelFetch() {
    console.log("Starting parallel fetch...");

    Promise.all([fetchUserProfile(), fetchUserPosts(), fetchCommentsWithError()])
        .then(results => {
            const [profile, posts, comments] = results;
            console.log("User profile retrieved:", profile);
            console.log("Posts retrieved:", posts);
            console.log("Comments retrieved:", comments);
        })
        .catch(error => console.error("Error in parallel fetch:", error));
}

async function sequentialFetchWithAsyncAwait() {
    try {
        console.log("Starting sequential fetch with async/await...");

        const profile = await fetchUserProfile();
        console.log("User profile retrieved:", profile);

        const posts = await fetchUserPosts();
        console.log("Posts retrieved:", posts);

        const comments = await fetchCommentsWithError();
        console.log("Comments retrieved:", comments);

    } catch (error) {
        console.error("Error in sequential fetch:", error);
    }
}

async function getUserContent() {
    try {
        console.log("Starting full content fetch...");

        const profile = await fetchUserProfile();
        console.log("User profile retrieved:", profile);

        const posts = await fetchUserPosts();
        console.log("Posts retrieved:", posts);

        const comments = await fetchCommentsWithError();
        console.log("Comments retrieved:", comments);

    } catch (error) {
        console.error("Error in getUserContent:", error);
    }
}

sequentialFetch();
parallelFetch();
sequentialFetchWithAsyncAwait();
getUserContent();
