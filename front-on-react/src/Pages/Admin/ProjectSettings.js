import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Form, Button, Tabs, Tab, Card, Alert,Col,Row, Img, Table, InputGroup } from "react-bootstrap";
import AdminLayout from "../../AdminLayout";


import {ToastContainer, Toast} from "react-bootstrap";

import  { getProject, saveProject, createProject, uploadLogoOnServer } from '../../functions/serverFunctionsForProjects'

import { BsFillFileArrowUpFill, BsFillFileArrowDownFill } from "react-icons/bs";

import { GetProjectPageComponents } from "../../functions/serverFunctionsForProjects"
import { GetCarouselSettings } from '../../functions/serverFunctionsForProjects';




export default function ProjectSettings () {

    //идентификатор проекта
    let { pid } = useParams();
    const [key, setKey] = useState('mainSettings');
    const  [createMode, setCreateMode] = useState(false);

    /*if(pid == null || pid === undefined)
    {
        setCreateMode(true);
    }*/
    //console.log({pid});


    return (
    <AdminLayout>
      

      <br/>
    <Container>
    


    <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="mainSettings" title="Основные настройки">
            <ToastContainer position="top-end" className="p-3">
            
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            </ToastContainer>

            {
            //Номер проекта:{pid}
            }
            
            {
              ProjectSettingsForm(pid)
            }

            
          </Tab>
          <Tab eventKey="header" title="Шапка сайта">
            {
              HeaderForm(pid)
            }
          </Tab>

          <Tab eventKey="carousel" title="Настройка основного баннера">
            {
              CarouselForm(pid)
            }
          </Tab>

          <Tab eventKey="mainPageProducts" title="Товары на главной странице">
            {
              MainPageProducts(pid)
            }
          </Tab>


          <Tab eventKey="productsPageSettings" title="Настройки каталога товаров">
          {
              ProductsPageSettings(pid)
          }
          </Tab>
          
          <Tab eventKey="contact" title="Контактные данные">
          {
            ContactsForm(pid)
          }
          </Tab>

          <Tab eventKey="footer" title="Подвал сайта">
          {
            FooterForm(pid)
          }

          </Tab>

        </Tabs>

    </Container>


    </AdminLayout>
  );


}




function ProjectSettingsForm(pid){

  //const [project, setProject] = useState({projectName:"", description:""});
 const [projectName, setProjectName] = useState("");
 const [projectDescription, setProjectDesc] = useState("");
 const [alertShow, setAlertShow] = useState(false);
 const [alertData, setAlertData] = useState({text:"", variant:""});



 //получаем данные о проекте
 useEffect(()=> {
  
  if(pid != null && pid !== undefined){
      const getProjectResp =  getProject(pid);

      //console.log({getProjectsResp});

      getProjectResp.then(resp => {
        //console.log({resp});

        if(resp.success){
          //setProject(resp.project);
          setProjectName(resp.project.projectName);
          setProjectDesc(resp.project.description);
        }
      });
    }


  },[])


  const SaveProject = () => {

    if(pid === undefined || pid == null)
    {
        //создаем
        const resp = createProject(projectName, projectDescription);

        resp.then(result => {
          console.log({result});
          setAlertShow(true);
          

          if(result.success){
            setAlertData({text:result.message, variant:"success"})
          }
          else {
            setAlertData({text:result.message, variant:"danger"})
          }
          
        })

    }
    else {
        //сохраняем
        const resp = saveProject(pid, projectName, projectDescription);
        //console.log({resp});
        

        resp.then(result => {
          console.log({result});
          setAlertShow(true);
          

          if(result.success){
            setAlertData({text:result.message, variant:"success"})
          }
          else {
            setAlertData({text:result.message, variant:"danger"})
          }
          
        })
      }
  }



  return (
<Form className={'col-lg-6'}>
      <Form.Group className="mb-3">
        <Form.Label>Имя проекта</Form.Label>
        <Form.Control type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <Form.Text className="text-muted">
          Имя должно быть не короче пяти символов
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Краткое описание проекта</Form.Label>
        <Form.Control type="text" value={projectDescription} onChange={(e) => setProjectDesc(e.target.value)} />
      </Form.Group>
      
      <Button onClick={() => SaveProject("","", "")} variant="primary" type="button">
        Сохранить
      </Button>
      
      <Form.Group className="" style={{paddingTop:"10px"}}  >
        <Alert key={1} variant={alertData.variant} dismissible onClose={() => setAlertShow(false)} show={alertShow} >{alertData.text}</Alert>
      </Form.Group>

    </Form>

  )
}



function HeaderForm(pid) {
  

  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();

  const [file, setFile] = useState([]);


  async function handleFile(event) {
      //TODO: валидация формата, размера и разрешения файла
    
      const f = event.target.files[0];

      setFileName(f.name);
      setFileType(f.type);
      setFile(f);


      //console.log(f);
      //const b64 = await getBase64(f);
      //console.log({b64});
      //console.log(f.name);


      var reader = new FileReader();
      reader.readAsDataURL(f);

      reader.onload = function () {
        //console.log(reader.result);
        setFileData(reader.result);
      }

      reader.onerror  = function () {
          console.log(reader.error);
      }

      
  };

  
  const uploadLogo = () => {
    //const file = '';//добавить файл

    uploadLogoOnServer(fileData, fileName, fileType, pid);

  }

  function saveSettingShowHeader(e){

    console.log(e.target.checked);

    


  }

  /*async function getBase64(f1) {
      var reader = new FileReader();
      reader.readAsDataURL(f1);
      
      
      reader.onload = function () {
        
        console.log(reader.result);

        setFileData(reader.result);

        //constimg = new Image();
        //img.src = reader.result;
        //document.body.appendChild(img);

      };


      //const res = await reader.onload;
      //console.log({res});

      res.then(result => {
        

        setFileData(result);
      })

      //const err = await reader.onerror;

      
      //err.then((text)=> {
      //  console.error(text);
      //});

  }*/



  return(
    <>
    
    

      <Row>
            <Col sm="6" xs="12">

            <Card>
            <Card.Body>
              <Card.Title>Варианты "шапки" сайта:</Card.Title>

                    <Form.Group as={Row} className="mb-3" controlId="controlId1">
                    <Form.Label column sm="8">
                      Отображать шапку сайта 
                    </Form.Label>
                    <Col sm="4">
                      <Form.Check onChange={(e) => saveSettingShowHeader(e)}  type="checkbox" id="checkbox"  />
                    </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="controlId1">
                    <Form.Label column sm="8">
                    Вид 
                    </Form.Label>
                    <Col sm="4">
                    <Form.Select>
                    <option>Логотип слева</option>
                    <option>Логотип в центре</option>
                    </Form.Select>
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="controlId1">
                    <Form.Label column sm="8">
                      Включить функцию "избранные товары" на сайте
                    </Form.Label>
                    <Col sm="4">
                      <Form.Check  type="checkbox" id="checkbox"  />
                    </Col>
                    </Form.Group>

            </Card.Body>
            </Card>


            </Col>

            <Col sm="6" xs="12">
            <Card>
            <Card.Body>
              <Card.Title>Логотип</Card.Title>
                <Form.Group controlId="formFileSm" className="mb-3"  as={Row}>
                <Form.Label column sm="7">Выбранный логотип</Form.Label>
                <Col sm="5">
                <Card.Img src={file} width="100" height="100"/>
                </Col>
                </Form.Group>

                <Form.Group controlId="formFileSm" className="mb-3"  as={Row}>
                <Form.Label column sm="7">Выбрать новый</Form.Label>
                <Col sm="5">
                  <Form.Control type="file" onChange={handleFile}  />

                  
                </Col>
                </Form.Group>

                <Button onClick={()=>uploadLogo()}>Загрузить на сервер</Button>

            </Card.Body>
            </Card>

            </Col>
            </Row>

            <hr/>
            <Row>
              <Col sm="12">
                <Button  onClick={() => alert("Еще не реализовано")} variant="primary" type="button">Сохранить</Button>
              </Col>
            </Row>
        </>

  )
}


  
function CarouselForm(projectId) {

  useEffect(() => {

      const componentsResp = GetProjectPageComponents(projectId);
      
      componentsResp.then(result => {
        const arr = result.bodyPageComponents.filter(item => item.componentGroupId === 2); //2 группа карусели// todo: вынести в настройки

        //console.log({arr});
        const carouselComponentId = arr[0].componentId;


      const getResp = GetCarouselSettings(carouselComponentId);   

      getResp.then(resp =>{
        console.log({resp})
      }
      );




      });

      


      
      //const carouselComponentId = components.filter()


      //читаем баннер
      //const getResp = GetCarouselSettings(componentId);

      /*getResp.then(resp =>{
        console.log({resp})
      }
      );*/

  }, [])



  return(<>
      <Row>
        <Col xxl="12" sm="12" xs="12">

        <Card>
            <Card.Body>
              <Card.Title>Настройки баннера</Card.Title>
              <p>Настройки большого баннера на главной странице</p>
              <Row>
                    <Col sm="1" >
                      #1
                      <BsFillFileArrowDownFill onClick={() => { alert('down')}} style={{fontSize:"1.5rem", cursor: "pointer"}}/>
                      <BsFillFileArrowUpFill onClick={() => { alert('up')}} style={{fontSize:"1.5rem", cursor: "pointer"}}/>
                    </Col>
                    <Col sm="2"><Form.Control type="text" placeholder='Заголовок'  /></Col>
                    <Col sm="3"><Form.Control type="text" placeholder='Дополнительный текст'  /></Col>
                    <Col sm="2"><Form.Control type="text" placeholder='Ссылка, если необходимо'  /></Col>
                    <Col sm="4">
                    <div style={{textAlign:"center", paddingBottom:"10px"}}><img height="100" width="200"/></div>
                    <div><Form.Control type="file" placeholder='Дополнительный текст'  /></div>
                    </Col>
              </Row>





            <hr/>
            <Button variant='primary'  >Сохранить</Button>
            </Card.Body>
        </Card>

        </Col>
        <Col >
        { /*
        <Card>
            <Card.Body>
              <Card.Title></Card.Title>


            </Card.Body>
        </Card>
        */
        }
        </Col>
      </Row>
      </>)

  
}



const styles = {

  thead : {
    display: "block",
  },

  tbody : {
    overflowY: "scroll",
    overflowX: "hidden",
    height: "15vh",
    display: "block",

  },

  tdth: {
    minWidth: "120px",
    height: "25px",
    border: "solid 1px #ccc",
    overflow: "hidden",
    textOverflow: "ellipsis",
    //maxWidth: "300px",
},

table: {
  borderCollapse: "collapse",
  overflowX: "hidden"
}

};



function MainPageProducts(projectId){



  return(<>

      <Card>
        <Card.Body>
          <Card.Title>Настройки блока</Card.Title>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="8">
              Отображать блок
              </Form.Label>
              <Col sm="4">
              <Form.Check type="checkbox" id="checkbox" label="" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="8">
                Порядок отображения блока
              </Form.Label>
              <Col sm="4">
                  <Form.Select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="8">
                Количество товаров в строке (чем меньше товаров, тем крупнее карточки)
              </Form.Label>
              <Col sm="4">
                  <Form.Select>
                  <option>4</option>
                  <option>6</option>
                  <option>8</option>
                  </Form.Select>
              </Col>
            </Form.Group>
        </Card.Body>
      </Card>


  <Row style={{paddingTop:"10px"}}>
    <Col xxl="12" sm="12" xs="12">



    <Card>
        <Card.Body>
          <Card.Title>Отображаемые продукты на главной странице</Card.Title>

          
          <Row  style={{paddingTop:"10px"}}>
            <Col ><Button>Загрузить список товаров</Button></Col>
            <Col ><Form.Control type="text" placeholder='Поиск по наименованию'   /></Col>
            <Col ><Button>Отфильтровать список</Button></Col>

          </Row>
          <Row  style={{paddingTop:"10px"}}>
            <Col xxl="6" sm="8" xs="12" >

              <div style={{width:"100%"}}>
              <div style={styles.table}>
              <table style={{width:"100%", backgroundColor:"#e0e0e0"}}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.tdth}>#</th>
                    <th style={styles.tdth}><input type="checkbox"/></th>
                    <th style={styles.tdth}>Наименование</th>
                  </tr>
                </thead>
                <tbody style={styles.tbody}>
                  <tr>
                    <td style={styles.tdth}>6565</td>
                    <td style={styles.tdth}><input type="checkbox"/></td>
                    <td style={styles.tdth}>Очень полезный товар 1</td>
                  </tr>
                  <tr>
                    <td style={styles.tdth}>6565</td>
                    <td style={styles.tdth}><input type="checkbox"/></td>
                    <td style={styles.tdth}>Очень полезный товар 1</td>
                  </tr>
                  <tr>
                    <td style={styles.tdth}>6565</td>
                    <td style={styles.tdth}><input type="checkbox"/></td>
                    <td style={styles.tdth}>Очень полезный товар 1</td>
                  </tr>
                  <tr>
                    <td style={styles.tdth}>6565</td>
                    <td style={styles.tdth}><input type="checkbox"/></td>
                    <td style={styles.tdth}>Очень полезный товар 1</td>
                  </tr>
                  <tr>
                    <td style={styles.tdth}>6565</td>
                    <td style={styles.tdth}><input type="checkbox"/></td>
                    <td style={styles.tdth}>Очень полезный товар 1</td>
                  </tr>
                  <tr>
                    <td style={styles.tdth}>6565</td>
                    <td style={styles.tdth}><input type="checkbox"/></td>
                    <td style={styles.tdth}>Очень полезный товар 1</td>
                  </tr>
                  <tr>
                    <td style={styles.tdth}>6565</td>
                    <td style={styles.tdth}><input type="checkbox"/></td>
                    <td style={styles.tdth}>Очень полезный товар 1</td>
                  </tr>

                </tbody>
              </table>
              </div>
              </div>
            </Col>
          </Row>

          <Row style={{paddingTop:"10px"}}>
            <Col sm="12" style={{textAlign:"right"}}>
              <Button>Добавить выбранные товары на главную</Button>
            </Col>
          </Row>


          <Card.Title>Изменить порядок отображения на главной странице</Card.Title>
          <Row style={{paddingTop:"10px"}}>
                <Col sm="1" >
                  #1
                  <BsFillFileArrowDownFill onClick={() => { alert('down')}} style={{fontSize:"1.5rem", cursor: "pointer"}}/>
                  <BsFillFileArrowUpFill onClick={() => { alert('up')}} style={{fontSize:"1.5rem", cursor: "pointer"}}/>
                </Col>
                <Col sm="2"><Form.Control type="text" placeholder='Заголовок' readOnly  /></Col>
                <Col sm="3"><Form.Control type="text" placeholder='Описание' readOnly  /></Col>
                <Col sm="4">
                <div style={{textAlign:"center", paddingBottom:"10px"}}><img height="100" width="200"/></div>
                
                </Col>
                <Col sm="2">
                <Button variant="secondary">Удалить</Button>
                </Col>
          </Row>

       
        
        </Card.Body>
    </Card>

    
    </Col>

  </Row>
  <br/>
  <br/>
  <br/>
  </>)
}


//
//настройки отображения каталога товаров на сайте
//
function ProductsPageSettings(projectId){


  return (
    <>
    <p className='h2'>Настройки каталога товаров</p>
    <Card style={{marginTop:"10px"}}>
    <Card.Body>
      <Card.Title></Card.Title>
      <Form.Group as={Row} className="mb-3" controlId="c1">
          <Form.Label column sm="8">
            Отображать страницы товаров и категорий
          </Form.Label>
          <Col sm="4">
            <Form.Check type="checkbox" id="checkbox" label="" />
          </Col>
      </Form.Group>


    </Card.Body>
  </Card>

  <Card style={{marginTop:"10px"}}>
    <Card.Body>
      <Card.Title>Настройки отображения страницы категории</Card.Title>

    </Card.Body>
  </Card>

  <Card style={{marginTop:"10px"}}>
    <Card.Body>
      <Card.Title>Настройки отображения страницы товара</Card.Title>

    </Card.Body>
  </Card>
  </>
  )
}




function ContactsForm() {

  return(<>
        <p className='h2'>Контактные данные</p>
        <Card style={{marginTop:"10px"}}>
        <Card.Body>
          <Card.Title></Card.Title>
          <Form.Group as={Row} className="mb-3" controlId="c1">
              <Form.Label column sm="8">
                Основной номер телефона
              </Form.Label>
              <Col sm="4">
                <Form.Control type="text" placeholder="+7(499) 123-44-55"  label="" />
              </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3" controlId="c1">
              <Form.Label column sm="8">
                Основной email
              </Form.Label>
              <Col sm="4">
                <Form.Control type="text" placeholder="mail@mail.ru"  label="" />
              </Col>
          </Form.Group>


          {
          

          /*   TODO: отображать график + редактор графика

          <Form.Group as={Row} className="mb-3" controlId="c1">
          <Form.Label column sm="8">
            Отображать график работы
          </Form.Label>
          <Col sm="4">
            <Form.Check type="checkbox" id="checkbox" label="" />
          </Col>
          </Form.Group>
          */


          }
          </Card.Body>
        </Card>



  </>)


}



function FooterForm(pid) {



  return(<>
        <p className='h2'>Контактные данные</p>
        <Card style={{marginTop:"10px"}}>
        <Card.Body>
          <Card.Title></Card.Title>
            <Form.Group as={Row} className="mb-3" controlId="c1">
            <Form.Label column sm="8">
              Отображать "подвал" сайта
            </Form.Label>
            <Col sm="4">
              <Form.Check type="checkbox" id="checkbox" label="" />
            </Col>
            </Form.Group>
          </Card.Body>
        </Card>
  
  </>)

}