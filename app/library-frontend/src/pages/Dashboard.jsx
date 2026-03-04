import TotalBooksCard from "../components/dashboard/TotalBooksCard";
import AverageYearCard from "../components/dashboard/AverageYearCard";
import BooksPerAuthor from "../components/dashboard/BooksPerAuthor";
import BooksPerCategory from "../components/dashboard/BooksPerCategory";

function Dashboard(){

  return(

    <div>

      <h2>Library Insights</h2>

      <div className="dashboard-grid">

        <TotalBooksCard/>

        <AverageYearCard/>

        <BooksPerAuthor/>

        <BooksPerCategory/>

      </div>

    </div>

  )
}

export default Dashboard