import { Link, useNavigate } from 'react-router-dom'
import './Pagination.css'
import {useDispatch} from 'react-redux'
import {setCurrentPage,NextPage, PrevPage} from '../../app/reducers/postsSlice'
import { Button } from 'react-bootstrap'





const Pagination = ({cp, np})=>{

    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // const useHandleClick=(i)=>{
    
    //     dispatch(setCurrentPage(i))

    // }


    function fun(cp,np){
        var arr=[]
        for(var i=1;i<=np;++i){
            const tmp_cp = i
            arr.push(
              
                 <Link to={`/posts?page=${i}`} key={i} style={{textDecoration:'none'}}>
                      <div className={ `pagination_item ${cp == i ? 'page_active' : ''} ` }
                       onClick={()=>dispatch(setCurrentPage(tmp_cp))} style={{width:'40px', height:'40px',display:'flex',alignItem:'center',justifyContent:'center', borderRadius:'100%'}} >
                        {i} 
                      </div>

                      

                   
                 </Link>
                 
                
            )
        }
   
        return arr
   }
   

    const nextExists = (np > 1 && cp<np) ? true : false;
    const prevExists = (np > 1 && cp>1) ? true : false;

    return (
        <div style={{bottom:'0',right:'0', width:'100%', backgroundColor:'#f8f8f8'}}>

            <div style={{display:"flex", flexDirection:'row',margin:'50px auto',maxWidth:'700px', justifyContent:'center', alignItems:'center'}}>
            
                <div className=""> 
                <Button disabled={!prevExists} variant="outline-secondary" style={{borderRadius:'100%'}} onClick={()=>navigate(`/posts?page=${Number(cp)-1}`)}>  {'<'} </Button> 
                </div>
                <div style={{display:"flex", flexDirection:'row'}}>
                        {
                            
                            fun(cp,np)    
                            
                        }
                    
                        {/* <div className={ `pagination_item ${cp==1 ? 'page_active' : ''} ` }> 1 </div>
                        <div className={ `pagination_item ${cp== 2 ? 'page_active' : ''} ` }> 2 </div>
                        <div className={ `pagination_item ${cp== 3 ? 'page_active' : ''} ` }> 3 </div> */}
                    
                </div>
                
                <div className="">   
                    <Button disabled={!nextExists}  variant="outline-secondary" style={{borderRadius:'100%'}} onClick={()=>navigate(`/posts?page=${Number(cp)+1}`)}>  {'>'} </Button> 
                </div>
            </div>
        </div>
       
    )
}

export default Pagination