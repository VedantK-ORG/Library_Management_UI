import { useEffect,useState } from "react";
import { getAuthors } from "../services/api";

import AuthorForm from "../components/authors/AuthorForm";
import AuthorsList from "../components/authors/AuthorsList";

function AuthorsPage(){

  const [authors,setAuthors] = useState([]);

  const loadAuthors = async () => {

    const data = await getAuthors();

    setAuthors(data);
  };

  useEffect(()=>{
    loadAuthors();
  },[]);

  return(

    <div>

      <h2>Authors Management</h2>

      <AuthorForm refresh={loadAuthors}/>

      <AuthorsList authors={authors} refresh={loadAuthors}/>

    </div>

  );
}

export default AuthorsPage;