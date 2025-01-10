import { useContext, useState } from "react";
import { BASE_URL } from "../constants";
import { AuthContext } from "../context/authContext";


interface CardProps {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}

export default function Card(props: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDescription, setDescription] = useState(props.description);
  const [isCompleted, setIsCompleted] = useState(props?.isCompleted || false);
  const {token} = useContext(AuthContext)

  // update todo item
  const handleEdit = async () => {
    try {
      await fetch(`${BASE_URL}/todos/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });
    
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  // deletes item from the todos array
  const handleDelete = () => {
    try {
      fetch(`${BASE_URL}/todos/${props.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // update todo item
  const handleTaskStatusUpdate = async (isCompleted: boolean) => {
    setIsCompleted(isCompleted);
    try {
      await fetch(`${BASE_URL}/todos/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isCompleted,
        }),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "4px",
            }}
          >
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="card-actions">
            <button className="save" onClick={handleEdit}>
              Save
            </button>
            <button className="cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "8px",
            }}
          >
            <input
              style={{ alignSelf: "self-start" }}
              type="checkbox"
              checked={isCompleted}
              onClick={(e) => handleTaskStatusUpdate(e.currentTarget.checked)}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "8px",
              }}
              className={`${isCompleted ? "task-complete" : ""}`}
            >
              <h3 className="card-title">{newTitle}</h3>
              <p className="card-desc">{newDescription}</p>
            </div>
          </div>
          {!isCompleted && (
            <div className="card-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}