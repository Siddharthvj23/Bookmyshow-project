import { Modal,message } from "antd"
import { showloading,hideloading } from "../../redux/loaderSlice"
import { useDispatch } from "react-redux"
import { deleteTheatre } from "../../apicalls/theatres"

const DeleteTheatreModal = ({isDeleteModalOpen,setisDeleteModalOpen,selectedTheatre,setSelectedTheatre,getData})=>{
    const dispatch = useDispatch()
    const handleOk = async()=>{
        try {
            dispatch(showloading())
            const theatreId = selectedTheatre._id
            const response = await deleteTheatre({theatreId})

            if(response.success){
                message.success(response.message)
                getData()
            }else{
                message.error(response.message)
                setSelectedTheatre(null)
            }
            setisDeleteModalOpen(false)
            dispatch(hideloading())
        } catch (error) {
            dispatch(hideloading())
            setisDeleteModalOpen(false)
            message.error(error.message)
            
        }
    }
const handleCancel =() =>{
    setisDeleteModalOpen(false)
    setSelectedTheatre(null)
}

  return (
    <>
    <Modal title = "Delete Theatre?" open={isDeleteModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="DeleteBtn-modal">
            <p>
            Are you sure you want to delete this Theatre?
            </p>
            <p>
            This action can't be undone and you'll lose this theatre data.
            </p>
        </div>
    </Modal>
</>
  )
}

export default DeleteTheatreModal