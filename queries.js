// Task 2: Basic CRUD Operations
1. //Find books in a specific genre:
    db.books.find({ genre: "Fiction" });

2. //Find books published after 1950:
    db.books.find({ published_year: { $gt: 1950 } });

3. //Find books by a specific author:
    db.books.find({ author: "George Orwell" });

4. //Update the price of a specific book
     db.books.updateOne(
  { title: "The Alchemist" }, // Filter by book title
  { $set: { price: 12.99 } }     // Update the price
);
5. //Delete a book by its title
     db.books.deleteOne(
  { title: "The Alchemist" } // Filter by title
);
// Task 3: Advanced Queries
6. //query to find books that are both in stock and published after 2010
    db.books.find({
    inStock: true,
    publishedYear: { $gt: 2010 }
});
// Task 4: Aggregation Pipeline
7. // Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",           // Group by the genre field
      averagePrice: {          // Calculate average price
        $avg: "$price"
      },
      count: {                 // Optional: include book count per genre
        $sum: 1
      }
    }
  },
  {
    $project: {                // Optional: format the output
      genre: "$_id",
      averagePrice: 1,
      count: 1,
      _id: 0                   // Exclude the default _id field
    }
  },
  {
    $sort: {                   // Optional: sort by average price (descending)
      averagePrice: -1
    }
  }
]);

8.// aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",          // Group by author
      bookCount: {             // Count books per author
        $sum: 1
      }
    }
  },
  {
    $sort: {                   // Sort authors by book count (descending)
      bookCount: -1
    }
  },
  {
    $limit: 1                  // Return only the top result
  },
  {
    $project: {                // Format the output
      author: "$_id",
      bookCount: 1,
      _id: 0
    }
  }
]);
// Task 5: Indexing
9. //an index on the `title` field for faster searches
db.books.createIndex({ title: 1 })  // 1 for ascending order
// Compound index and published_year
db.books.createIndex({ 
  author: 1,          // 1 for ascending order
  published_year: -1  // -1 for descending order
});
