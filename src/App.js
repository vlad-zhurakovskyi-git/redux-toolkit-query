import React, { useState } from 'react';
import {
    useGetTodosQuery,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation
} from "./services/todoService";

function App() {
    const [inputValue, setInputValue] = useState('');
    
    const { data: todos, isError, error, isLoading } = useGetTodosQuery();
    
    const [createTodo, {}] = useCreateTodoMutation();
    const [updateTodo, {}] = useUpdateTodoMutation();
    const [deleteTodo, {}] = useDeleteTodoMutation();
    
    if (isLoading) return <div>...loading</div>
    if (isError) return <div>{error.status}</div>
    
    const handleInputChange = (e) => setInputValue(e.target.value);
    
    const handleDeleteTodo = (id) => deleteTodo(id);
    
    const handleUpdateTodo = (id) => {
        const text = prompt();
        
        if (!text) return;
        
        updateTodo({
            id,
            text
        })
    };
    
    const handleCreatePost = () => {
        const id = Date.now();
    
        createTodo({
            id,
            text: inputValue
        })
        
        setInputValue('');
    }
  
    return (
        <div className="page">
            <div className='posts-form'>
                <input
                    className='posts-form__input'
                    onChange={handleInputChange}
                    value={inputValue}
                    type="text"
                    placeholder='Введите текст'
                />
                
                <button
                    className='btn'
                    onClick={handleCreatePost}
                >
                    Создать пост
                </button>
            </div>
            
            <div className='posts'>
                {todos.map(({ id, text }) => (
                    <div className='post' key={id}>
                        <div className='post__text'>{text}</div>
                        
                        <div className='post__buttons'>
                            <button
                                className='btn'
                                onClick={() => handleUpdateTodo(id)}
                            >
                                Редактировать
                            </button>
                            
                            <button
                                className='btn'
                                onClick={() => handleDeleteTodo(id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            
        </div>
    );
}

export default App;
