import { useEffect } from "react";
import { useParams } from "react-router-dom"

export function Management(){
  const {item} = useParams();

  useEffect(()=>{
  }, [])
  return(
    <>
      Management
      {item}
    </>
  )
}