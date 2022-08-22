import { useEffect, useState } from "react";

import AdminLayout from "../../AdminLayout";

import {getCategories} from "../../functions/serverFunctionsForCategories"

export default function AdminCategoriesListPage(){
    const [categoriesList, setCategoriesList] = useState();

    const updateCategories = () =>{
        const getResp = getCategories();

        getResp.then(resp => {
            console.log({resp});
            if(resp.success){
                setCategoriesList(resp.categories);
            }
          });
    }


    


    return(
        <AdminLayout>
            
        </AdminLayout>
    )

}