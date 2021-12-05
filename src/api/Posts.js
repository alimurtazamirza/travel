import Server from "./Server";
const server  = Server.apiServer;
const token  = Server.token;
// server.setHeader('Authorization', 'Bearer '+token);
const storePosts = (title,body) =>
 server.post(`/api/posts`, { title: title, body:body });

const getPosts = () => {
 server.setHeaders({'Authorization': `Bearer ${token}`})
 server.get(`/api/posts`,{});
}

export default {
    getPosts,
    storePosts
}