import { Modal,message } from "antd";
import { DeleteMovie } from "../../apicalls/movies";
import { showloading,hideloading } from "../../redux/loaderSlice";
import { useDispatch } from 'react-redux'

const DeleteMovieModal = ({isDeleteModalOpen,setIsDeleteModalOpen,selectedMovie,setSelectedMovie,getData})=>{
    const dispatch = useDispatch()
    const handleOk = async()  =>{
        try {
            dispatch(showloading())
            const movieId = selectedMovie._id
            const response = await DeleteMovie({movieId});

            if(response.success){
                message.success(response.message)
                getData()
            }else{
                message.error(response.message)
                setSelectedMovie(null)
            }
            setIsDeleteModalOpen(false)
            dispatch(hideloading())


        } catch (error) {
            dispatch(hideloading)
            setIsDeleteModalOpen(false)
            message.error(error.message)
        }
    }

const handleCancel = () =>{
    setIsDeleteModalOpen(false)
    setSelectedMovie(null)
}
return(
    <>
        <Modal title = "Delete Movie?" open={isDeleteModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className="DeleteBtn-modal">
                <p>
                Are you sure you want to delete this movie?
                </p>
                <p>
                This action can't be undone and you'll lose this movie data.
                </p>
            </div>
        </Modal>
    </>
)
}
export default DeleteMovieModal