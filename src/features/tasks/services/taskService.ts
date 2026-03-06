// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
//   where,
// } from "firebase/firestore";
// import { db } from "../../../api/firebaseConfig";

// export const taskService = {
//   addTask: async (userId: string, title: string) => {
//     try {
//       await addDoc(collection(db, "tasks"), {
//         userId,
//         title,
//         completed: false,
//         createdAt: serverTimestamp(),
//       });
//     } catch (error: any) {
//       throw error.message;
//     }
//   },

//   getTasks: (userId: string, callback: (tasks: any[]) => void) => {
//     const q = query(
//       collection(db, "tasks"),
//       where("userId", "==", userId),
//       orderBy("createdAt", "desc")
//     );

//     // The error is triggered here because of the orderBy + where combination
//     return onSnapshot(
//       q,
//       (snapshot) => {
//         const tasks = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         callback(tasks);
//       },
//       (error) => {
//         // This will log the index error until you click that link!
//         console.error("Firestore Snapshot Error:", error.message);
//       }
//     );
//   },

//   deleteTask: async (taskId: string) => {
//     try {
//       await deleteDoc(doc(db, "tasks", taskId));
//     } catch (error: any) {
//       throw error.message;
//     }
//   },
// };

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
import { CategoryType } from "../constants/categories";

export const taskService = {
  addTask: async (userId: string, title: string, category: CategoryType) => {
    try {
      await addDoc(collection(db, "tasks"), {
        userId,
        title,
        category, // New Field
        completed: false,
        createdAt: serverTimestamp(),
      });
    } catch (error: any) {
      throw error.message;
    }
  },

  getTasks: (userId: string, callback: (tasks: any[]) => void) => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(tasks);
      },
      (error) => {
        console.error("Firestore Snapshot Error:", error.message);
      }
    );
  },

  deleteTask: async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error: any) {
      throw error.message;
    }
  },
};
