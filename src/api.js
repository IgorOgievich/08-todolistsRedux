import axios from "axios";



const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
});

const api =  {
    createTodoList(title) {
       return instance.post(
            "",
           {title:title}
        )
    },
    getTodoList() {
      return  instance.get("")
    },
    getTasks(todoListId) {
       return instance.get(`/${todoListId}/tasks`)
    },
    createTasks(newText, todoListId) {
      return  instance.post(
            `/${todoListId}/tasks`,
            {title: newText},
        )
    },
    deleteTodoList(todoListId) {
        return instance.delete(
            `/${todoListId}`,
            )
    },
    deleteTask(todoListId, taskId) {
       return instance.delete(
            `/${todoListId}/tasks/${taskId}`,
        )
    },
    createTask(t, obj) {
        return axios.put(
            `https://social-network.samuraijs.com/api/1.1//todo-lists/${t.todoListId}/tasks/${t.id}`,
            {...t, ...obj},
            {
                withCredentials: true,
                headers: {"API-KEY": "affe6fba-b980-44f3-83ec-8eb8f1646ae1"}
            }
        )
    },
    createTitleTodolist(todoListId, title) {
        return  instance.put(
            `${todoListId}`,
            {title: title},
        )
    }
};

export default api