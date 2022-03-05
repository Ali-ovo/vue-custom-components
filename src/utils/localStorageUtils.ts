import { Todo } from "@/types/todo";

// 保存数据到浏览器缓存中
export function saveTodos(todo: Todo[]) {
  localStorage.setItem('todos_key', JSON.stringify(todo))
}

// 从浏览器的缓存中读取数据
export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos_key') || '[]')
}