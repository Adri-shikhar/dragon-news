import { redirect } from "next/navigation";



const Homepage = async () => {
  const id = "01";
  redirect(`/category/${id}`);
};

export default Homepage;
