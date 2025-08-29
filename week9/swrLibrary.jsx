import useSWR from 'swr';

const fetcher = async function(url) {
    //fetch data
    const data = await fetch(url);
    const json = await data.json();
    return json;
};

function Profile() {
    const {data, error , isLoading} = useSWR('link',fetcher,{
        refreshInterval:5000, //🔁 POLLING (Auto-refresh every few seconds)
        revalidateOnFocus:true, //
        revalidateOnReconnect: true // 🔂 REVALIDATE ON FOCUS / RECONNECT
    });

    if(error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>;

  // Render the component with the fetched data
  return <div>Hello, you have {data.todos.length} todos!</div>;
}

// Feature	Function
// useSWR	Core data-fetching hook
// mutate	Update or revalidate data manually
// useSWRInfinite	Infinite scroll with pagination
// fallbackData	Show cached/SSR data instantly
// refreshInterval	Auto-fetch at interval
// revalidateOnFocus	Refetch when tab regains focus
// SWRConfig	Global configuration
// conditional keys	Skip fetch until condition is met
// errorRetryCount	Retry failed requests