import { useDispatch } from "react-redux"
import { TodoDispatch } from "../store/store"


export const useAppDispatch = () => useDispatch<TodoDispatch>();