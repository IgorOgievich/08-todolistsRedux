import axios from "axios";


const api =  {
    createTodoList(title) {
       return axios.post(
            "https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title:title},
            {
                withCredentials: true,
                headers: {"API-KEY" : "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }

        )
    },
    getTodoList() {
      return  axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
    },
    getTasks(todoListId) {
       return axios.get(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todoListId}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
    },
    createTasks(newText, todoListId) {
      return  axios.post(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${todoListId}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {"API-KEY": "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
    },
    deleteTodoList(todoListId) {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${todoListId}`,
            {
                withCredentials: true,

                headers: {"API-KEY": "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
    },
    deleteTask(taskId, todoListId) {
       return axios.delete(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${todoListId}/tasks/${taskId}`,
            {
                withCredentials: true,

                headers: {"API-KEY": "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
    },
    createTask(todoListId, taskid,newTask) {
       return axios.put(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${todoListId}/tasks/${taskid}`,
            newTask,
            {
                withCredentials: true,
                headers: {"API-KEY": "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
    }

};

export default api