import { BiBold } from "react-icons/bi"
import { AiOutlineUnderline } from "react-icons/ai"
import { BiItalic } from "react-icons/bi"






const CustomBoldBtn = () => <BiBold size="25"></BiBold>
const CustomUnderLinebtn  = ()=> <AiOutlineUnderline size="25"></AiOutlineUnderline>

const CustomItalicBtn = ()=> <BiItalic size="25"/>


export const CustomToolBar = () => {

 
 
  

    return <div id="toolbar">
      
      <select className='ql-size'/>
  
      <button className='ql-image' />
      <button className='ql-video' /> 
     <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        
      </select>
     <button className='ql-custombold' >
     <CustomBoldBtn></CustomBoldBtn>
      </button>
      <button className='ql-customItalic'>
        <CustomItalicBtn></CustomItalicBtn>
      </button>
      <button className='ql-customUnderline'>
        <CustomUnderLinebtn></CustomUnderLinebtn>
      </button>
  </div>
  }