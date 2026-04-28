import React, { useCallback, useMemo, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Themes";
import {
  GlobalStyle,
  H1,
  HeaderImage,
  Container,
  RowSpaceBetween,
  ButtonThemeToggle,
  Header,
  InstructionText,
} from "./components/Global";
import "./App.css";
import { ToDoForm } from "./components/ToDo/ToDoForm";
import { ToDoMain } from "./components/ToDo/ToDoMain";
import { ToDoItem, ToDoItemProps } from "./components/ToDo/ToDoItem";
import { FilterButton } from "./components/ToDo/FilterButton";
import { nanoid } from "nanoid";
import { color } from "./styles/StyleTokens";

 const INITIAL_ITEMS = {
    toDoItems: [
      {
        id: "todo-0",
        name: "Eat",
        isComplete: true,
      },
      {
        id: "todo-1",
        name: "Sleep",
        isComplete: false,
      },
    ],
  };

export const FILTER_MAP: Record<string, (item: ToDoItemProps) => boolean> = {
  All: () => true,
  Active: (items: ToDoItemProps) => items.isComplete !== true,
  Completed: (items: ToDoItemProps) => items.isComplete !== false,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [theme, setTheme] = useState("light");
  const [items, setItems] = useState(INITIAL_ITEMS.toDoItems);
  const [filter, setFilter] = useState("All");

  const themeToggler = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleIsComplete = useCallback((id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    ));
  }, []);


  const itemsLeftCount = items.filter((item) => !item.isComplete).length;

  const draggedItemRef = useRef<ToDoItemProps | undefined>(undefined); 

  const onDragStart = useCallback((e: React.DragEvent<HTMLElement>, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    setItems(prev => {
      draggedItemRef.current = prev[index];
      return prev; // return unchanged items
    });
    (e.target as HTMLElement).style.cursor = "grabbing";
    if ((e.target as HTMLElement).parentElement !== null) {
      const parent = (e.target as HTMLElement).parentElement;
      if (parent !== null) {
        e.dataTransfer.setData("text/html", parent.id);
        e.dataTransfer.setDragImage(parent, 20, 20);
      }
    }
  }, []); 

  const onDragOver = useCallback((e: React.DragEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    setItems(prevItems => {
      const draggedOverItem = prevItems[index];

      // if the item is dragged over itself, ignore
      if (draggedItemRef.current === draggedOverItem) {
        return prevItems;
      }
      return prevItems;
    });
  }, []);

  const onDragEnter = useCallback((e: React.DragEvent<HTMLElement>, index: number) => {
    (e.target as HTMLElement).style.outline = `dotted 1px ${color.brightBlue}`;
    if ((e.target as HTMLElement).parentElement !== null) {
      const parent = (e.target as HTMLElement).parentElement;
      if (parent !== null)
        parent.style.outline = `dotted 1px ${color.brightBlue}`;
    }
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLElement>, index: number) => {
    (e.target as HTMLElement).style.outline = "none";
    if ((e.target as HTMLElement).parentElement !== null) {
      const parent = (e.target as HTMLElement).parentElement;
      if (parent !== null) parent.style.outline = "none";
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLElement>, index: number) => {
    (e.target as HTMLElement).style.outline = "none";
    if ((e.target as HTMLElement).parentElement !== null) {
      const parent = (e.target as HTMLElement).parentElement;
      if (parent !== null) parent.style.outline = "none";
    }

    setItems(prevItems => {
      const draggedOverItem = prevItems[index];
      // if the item is dragged over itself, ignore
      if (draggedItemRef.current === draggedOverItem) {
        return prevItems;
      }

      // filter out the currently dragged item
      let newItems = prevItems.filter((item) => item !== draggedItemRef.current);

      // add the dragged item after the dragged over item
      if (draggedItemRef.current !== undefined) newItems.splice(index, 0, draggedItemRef.current);

      return newItems; 
    });
  }, []);

  const onDragEnd = useCallback((e: React.DragEvent<HTMLElement>) => {
    (e.target as HTMLElement).style.cursor = "grab";
  }, []);

  const addItem = useCallback((name: string) => {
    const newItem: ToDoItemProps = {
      id: "todo-" + nanoid(),
      name: name,
      isComplete: false,
    };
    setItems((prev) => [...prev, newItem]);
  }, [])

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCompletedItems = useCallback(() => {
   setItems((prev) => prev.filter((item) => !item.isComplete));
  }, []);

  const toDoList = useMemo(() => items
    .filter(FILTER_MAP[filter])
    .map((toDoItem: ToDoItemProps, index: number) => (
      <ToDoItem
        key={toDoItem.id}
        toDoItem={toDoItem}
        toggleIsComplete={toggleIsComplete}
        deleteItem={deleteItem}
        index={index}
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
      />
    )), [items, filter, toggleIsComplete, deleteItem]);

  const filterButtonList = useMemo(() => FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      filterItems={setFilter}
    />
  )), [filter]);

  return (
    <div className="App">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <main>
          <Header>
            <HeaderImage />
            <Container>
              <RowSpaceBetween>
                <H1>ToDo</H1>
                <ButtonThemeToggle
                  onClick={themeToggler}
                  aria-label="ToggleTheme Color"
                />
              </RowSpaceBetween>
            </Container>
          </Header>
          <Container>
            <ToDoForm addToDoItem={addItem}/>
            <ToDoMain
              toDoItem={toDoList}
              filterButtonList={filterButtonList}
              itemsLeft={itemsLeftCount}
              clearAllItems={clearCompletedItems}
            />
            <InstructionText>
              Drag and drop the left-side handle buttons to reorder the list.
            </InstructionText>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
