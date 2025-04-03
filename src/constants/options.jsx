export const SelectTravelerList=[
{
    id:1,
    title:'Solo',
    icon:'🕺',
    description:'Traveling alone',
    people:'1'
},
{
    id:2,
    title:'Couple',
    icon:'👫',
    description:'Roaming with your partner',
    people:'2 people'
},
{
    id:3,
    title:'Small Group',
    icon:'👨‍👩‍👧‍',
    description:'Fun loving Adventure with friends/family',
    people:'3 to 5 people'
},
{
    id:4,
    title:'Large Group',
    icon:'👨‍👩‍👧‍👨‍👩‍👧‍',
    description:'Traveling with a big group',
    people:'5 to 10 people'
}
]

export const SelectBudgetList=[
    {
        id:1,
        icon:'💸',
        title:'Budget friendly',
        description:'Traveling on a budget'
    },
    {
        id:2,
        icon:'💰',
        title:'Moderate',
        description:'Costs on an average side'
    },
    {
        id:3,
        icon:'💎',
        title:'Luxury',
        description:'Costs are not a concern'
    }
]
export const AI_PROMPT='Generating Travel plan based for the Location: {location}, for {totalDays} days for {traveler} traveler(s) with a budget of {budget}. Give Hotel lists according to the budget with hotelName,HotelAddress,Price,hotel image URL, geo coordinates, rating, descriptions, and also Please provide a detailed itinerary with place name,place details, place image URL, Geo coordiates, ticket pricing, time travel, rating for each day for each of the {totalDays} days. Make sure to consider the travelers interests and preferences in JSON format. The output should be in JSON format';
