
import {useParams} from 'react-router-dom';


// Post page
// Route: /post/:id/:slug
export const Example = () => {
    const params = useParams();
    return <div style={{ padding: 30 }}>
      <h1>ID: {params.id}</h1>
      <h2>Slug: {params.slug}</h2>
    </div>
  }