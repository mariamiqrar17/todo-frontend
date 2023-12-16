import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';



const Todo = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [flag, setFlag] = useState(false);
  const [indexo, setIndexo] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const data = localStorage.getItem("Todo");

    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  const alpha = (e) => {
    setTodo(e.target.value);
    setError('');
  };
  const onAddHandler = () => {
    
    if (todo !== "") {
        setError('');

      let a = [...data, { name: todo }];
      setData(a);
      localStorage.setItem("Todo", JSON.stringify(a));
      setTodo("");
    } else {
        if (todo.trim() === '') {
            setError('Please enter a value');
          } else {
            setError('');
          }
      
    }
  };

  const onDeleteHandler = (indexing) => {
    let a = data.filter((value, index) => {
      if (indexing !== index) {
        return value;
      }
    });
    localStorage.setItem("Todo", JSON.stringify(a));
    setData(a);
  };
  const onUpdateHandler = (valueing, indexing) => {
    setTodo(valueing.name);
    setFlag(true);
    setIndexo(indexing);
  };
  const onEditHandler = () => {
    if (todo !== "") {
      let b = data.map((value, index) => {
        setFlag(false);
        if (indexo === index) {
          return { name: todo };
        } else {
          return value;
        }
      });
      localStorage.setItem("Todo", JSON.stringify(b));
      setData(b);
      setTodo("");
    } else {
        if (todo.trim() === '') {
            setError('Please enter a value');
          } else {
            setError('');
          }
    }
  };

  return (
    <div className=''>
      <p className="text-center text-blue-900 italic underline text-[30px] font-bold pt-4">Todo App</p>
      <a  className="block max-w-lg w-full mx-auto lg:text-end text-center pt-4 lg:pt-0  rounded-lg px-4 lg:px-0">
      <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Todos
<span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
{data.length}
</span>
</button>

</a>
      <div className="container mx-auto flex justify-center items-center px-4 pb-3">
        
        <div className="max-w-lg w-full h-30 bg-white border border-gray-200 rounded-lg mt-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-3 pt-4">
        <input
        type="text"
        value={todo}
        onChange={alpha}
        placeholder="Please add text...."
        required
        className={
            'bg-gray-50 border border-gray-300 lg:h-14 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' +
            (error ? ' border-red-500' : '')
          }
        
      />
      {error && <p className="text-red-500">{error}</p>}
          <div className="text-center pt-4">
            {flag ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onEditHandler}
              >
                Update
              </button>
            ) : (
              <button
                className="bg-blue-500 w-full lg:max-w-[130px] hover:bg-blue-700 text-white font-bold py-2 lg:py-3 px-4 rounded"
                onClick={onAddHandler}
              >
                Add Todo
              </button>
            )}
          </div>
        </div>
        
      </div>
      
      {data.length === 0 && (
        <div className="container mx-auto flex justify-center items-center px-4 pt-3">
          
        
<a  className="block max-w-lg w-full p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<p className="text-red-500">NO RECORD RIGHT NOW</p>
</a>
</div>
      )}

      
      {data?.map((value, index) => {
        return (
          <div
            key={index}
            className="container mx-auto flex justify-center items-center py-2 px-4 pt-3"
          >
            <a className="block max-w-lg w-full p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              
                <div className="grid lg:grid-cols-2 grid-cols-1">
                  <div className="flex">
                    <p>{index+1}.&nbsp;</p>
                    <p>{value.name}</p>
                  </div>
                  <div className="text-end pt-2 lg:pt-0">
                  <button
                        className="bg-red-500 w-[48%] lg:w-[30%] hover:bg-blue-700 text-[15px] text-white py-1 px-2 rounded"
                        onClick={() => onDeleteHandler(index)}
                         >
                        <FontAwesomeIcon icon={faTrashAlt} /> 
                      </button>
                    <button
                      className="bg-green-500 w-[48%] lg:w-[30%] ml-2 hover:bg-blue-700 text-white text-[15px] lg:ml-2 py-1 px-2 rounded"
                      onClick={() => onUpdateHandler(value, index)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                </div>
              
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default Todo;
