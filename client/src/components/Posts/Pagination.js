import { Link } from 'react-router-dom'
import './Pagination.css'
import {useDispatch} from 'react-redux'
import {setCurrentPage} from '../../app/reducers/postsSlice'





const Pagination = ({cp, np})=>{

    

    const dispatch = useDispatch()
    
    // const useHandleClick=(i)=>{
    
    //     dispatch(setCurrentPage(i))

    // }


    function fun(cp,np){
        var arr=[]
        for(var i=1;i<=np;++i){
            const tmp_cp = i
            arr.push(
              
                 <Link to={`/posts?page=${i}`} key={i} >
                      <div className={ `pagination_item ${cp == i ? 'page_active' : ''} ` } onClick={()=>dispatch(setCurrentPage(tmp_cp))} >
                        {i} 
                      </div>
                   
                 </Link>
                 
                
            )
        }
   
        return arr
   }
   

    const next = (np > 1 && cp<np) ? (cp+1) : null;
    const prev = (np > 1 && cp>1) ? (cp-1) : null;

    return (
       
        <div style={{display:"flex", flexDirection:'row'}}>
           
            <div className="pagination_item"> { next && <div> {'<'} </div> } </div>
            <div style={{display:"flex", flexDirection:'row'}}>
                    {
                         
                           fun(cp,np)    
                        
                    }
                
                    {/* <div className={ `pagination_item ${cp==1 ? 'page_active' : ''} ` }> 1 </div>
                    <div className={ `pagination_item ${cp== 2 ? 'page_active' : ''} ` }> 2 </div>
                    <div className={ `pagination_item ${cp== 3 ? 'page_active' : ''} ` }> 3 </div> */}
                 
            </div>
            
            <div className="pagination_item"> { prev && <div>  {'>'} </div> } </div>
        </div>
    )
}

export default Pagination