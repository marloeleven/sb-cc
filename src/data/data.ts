import { Recipe } from "@/types";

export const testRecipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "/images/recipe.jpg",
    description:
      "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    createdAt: "2023-01-01",
    name: "John Doe",
    email: "john.doe@example.com",
    ingredients: "Spaghetti, Pancetta, Eggs, Parmesan cheese, Black pepper",
    instructions:
      "Cook the spaghetti. Fry the pancetta. Mix eggs and Parmesan. Combine everything and season with black pepper.",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    image: "/images/recipe.jpg",
    description:
      "A popular Indian curry dish made with marinated chicken in a spiced tomato sauce.",
    createdAt: "2023-02-15",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    ingredients: "Chicken, Yogurt, Tikka masala spice mix, Tomato puree, Cream",
    instructions:
      "Marinate the chicken in yogurt and spices. Cook the chicken. Simmer in tomato puree and cream until thickened.",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Beef Stroganoff",
    image: "/images/recipe.jpg",
    description: "A Russian dish of sautéed beef in a creamy mushroom sauce.",
    createdAt: "2023-03-10",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    ingredients: "Beef, Mushrooms, Onion, Sour cream, Flour",
    instructions:
      "Sauté the beef. Cook mushrooms and onions. Add sour cream and flour to make the sauce. Combine with beef.",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Vegetable Stir Fry",
    image: "/images/recipe.jpg",
    description:
      "A quick and healthy dish made with fresh vegetables and a savory sauce.",
    createdAt: "2023-04-05",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    ingredients: "Broccoli, Carrots, Bell peppers, Soy sauce, Garlic",
    instructions:
      "Stir-fry the vegetables in a hot pan. Add soy sauce and garlic. Cook until tender-crisp.",
    isFavorite: true,
  },
  {
    id: 5,
    title: "Margherita Pizza",
    image: "/images/recipe.jpg",
    description:
      "A simple pizza topped with fresh tomatoes, mozzarella, and basil.",
    createdAt: "2023-05-20",
    name: "Chris Green",
    email: "chris.green@example.com",
    ingredients: "Pizza dough, Tomatoes, Mozzarella, Basil, Olive oil",
    instructions:
      "Spread tomato sauce on the dough. Add mozzarella and basil. Bake in the oven until the crust is golden.",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Caesar Salad",
    image: "/images/recipe.jpg",
    description:
      "A classic salad with romaine lettuce, croutons, and Caesar dressing.",
    createdAt: "2023-06-15",
    name: "Diana White",
    email: "diana.white@example.com",
    ingredients: "Romaine lettuce, Croutons, Caesar dressing, Parmesan cheese",
    instructions:
      "Toss the lettuce with Caesar dressing. Add croutons and Parmesan cheese. Serve immediately.",
    isFavorite: false,
  },
  {
    id: 7,
    title: "Pad Thai",
    image: "/images/recipe.jpg",
    description:
      "A popular Thai noodle dish with shrimp, tofu, peanuts, and tamarind sauce.",
    createdAt: "2023-07-10",
    name: "Evan Black",
    email: "evan.black@example.com",
    ingredients: "Rice noodles, Shrimp, Tofu, Peanuts, Tamarind sauce",
    instructions:
      "Cook the noodles. Stir-fry shrimp and tofu. Add tamarind sauce and mix with noodles. Top with peanuts.",
    isFavorite: false,
  },
  {
    id: 8,
    title: "Chocolate Cake",
    image: "/images/recipe.jpg",
    description:
      "A rich and moist chocolate cake with a creamy chocolate frosting.",
    createdAt: "2023-08-25",
    name: "Fiona Blue",
    email: "fiona.blue@example.com",
    ingredients: "Flour, Cocoa powder, Sugar, Eggs, Butter, Chocolate",
    instructions:
      "Mix the dry ingredients. Add eggs and butter. Bake in the oven. Frost with melted chocolate.",
    isFavorite: false,
  },
  {
    id: 9,
    title: "Grilled Salmon",
    image: "/images/recipe.jpg",
    description:
      "A healthy and flavorful dish with grilled salmon and lemon butter sauce.",
    createdAt: "2023-09-05",
    name: "George Red",
    email: "george.red@example.com",
    ingredients: "Salmon fillets, Lemon, Butter, Garlic, Parsley",
    instructions:
      "Grill the salmon. Prepare a lemon butter sauce with garlic and parsley. Serve the salmon with the sauce.",
    isFavorite: false,
  },
  {
    id: 10,
    title: "Tacos al Pastor",
    image: "/images/recipe.jpg",
    description:
      "Mexican tacos made with marinated pork, pineapple, and fresh cilantro.",
    createdAt: "2023-10-01",
    name: "Hannah Yellow",
    email: "hannah.yellow@example.com",
    ingredients: "Pork, Pineapple, Cilantro, Corn tortillas, Spices",
    instructions:
      "Marinate the pork with spices. Cook the pork and pineapple. Serve in tortillas with cilantro.",
    isFavorite: false,
  },
];
