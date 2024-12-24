import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../_Auth/Firebase";
import Bn from "../Assets/Bn.jpg";

const auth = getAuth(app);
const user = auth.currentUser;

const db = getFirestore(app);
let List = [];

async function getArray() {
  if (!user) {
    alert("No user is signed in!");
    return;
  }

  const docRef = doc(db, "ProductList", user.uid); // Use user.uid
  try {
    const docSnap = await getDoc(docRef); // Fetch the document
    if (docSnap.exists()) {
      const data = docSnap.data();
      List = data.ProductList || []; // Set List to the array field or an empty array if it doesn't exist
      alert(`Retrieved Array: ${JSON.stringify(List)}`);
    } else {
      alert("No such document!");
    }
  } catch (e) {
    alert("Error: " + e.message);
  }
}

getArray();

const ProductList = [
  {
    id: 1,
    description: "Nothingjfbfhffbfhbegvege",
    title: "AnujBook",
    link: "anuj2025.github.io/Mox",
    bucketId: "buck1",
    productId: "1",
    Assets: Bn,
  },
  {
    id: 2,
    description: null,
    title: null,
    link: null,
    bucketId: "buck2",
    productId: "1",
    Assets: null,
  },
];

export default List;
