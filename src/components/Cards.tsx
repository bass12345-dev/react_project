export const Cards = ({ row_card_item }: { row_card_item: any }) => {
    let _classes = `block w-full md:w-64 px-4 py-2  rounded-lg shadow hover:bg-gray-800   dark:bg-red-800 dark:border-gray-700 dark:hover:bg-red-500 ${row_card_item.color}`;
    return (

        <a href="#"
            className={_classes}>
            <p className="font-normal text-gray-400 dark:text-gray-200">{row_card_item.title}</p>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{row_card_item.amount}</h5>
        </a>

    )
}