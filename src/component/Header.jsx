import { useNavigate } from "react-router-dom"

const Header = ({header}) => {

    const navigate = useNavigate()
  return (
    <div className=" flex text fixed top-0 mb-2   text-black dark:bg-neutral-800 w-full max-w-[560px] dark:text-white text-opacity-60  items-center h-[48px] text-[18px]">
            <h2 className="cursor-pointer absolute md:px-[10px] pl-[20px] pr-[0px]" onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left"> </i>
            </h2>
            <h2 className="  w-full  text-center dark:text-white text-black text-opacity-70">
            {header}
            </h2>
          </div>
  )
}

export default Header