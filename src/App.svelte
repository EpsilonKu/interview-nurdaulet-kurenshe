<script lang="ts">
    import { DatePicker } from "@svelte-plugins/datepicker";
    import { format } from "date-fns";
    import { Toaster, toast } from "svelte-sonner";

    type Data = {
        firstname: string;
        lastname: string;
        country: string;
        date: string;
        terms: boolean;
        amount: string;
    };
    let data: Data = {
        firstname: "",
        lastname: "",
        country: "",
        date: "",
        terms: false,
        amount: "",
    };
    let startDate = new Date();

    $: buttonDisabled =
        data.amount === "" ||
        data.firstname === "" ||
        data.lastname === "" ||
        data.country === "" ||
        data.date === "";
    $: isDateOpen = false;
    $: formattedStartDate = formatDate(startDate);
    $: if (formattedStartDate) data.date = formattedStartDate;
    $: isLocked = false;
    $: if (data) data = formatData();

    function formatData() {
        return {
            firstname: data.firstname.replace(/[^a-zA-Z]+/g, ""),
            lastname: data.lastname.replace(/[^a-zA-Z]+/g, ""),
            country: data.country,
            date: data.date,
            terms: data.terms,
            amount:
                Number(data.amount.replace(/[^0-9.]/g, "")).toFixed(2) + " USD",
        };
    }

    function handleSubmit(event: any) {
        console.log("save", event);
        toast.success("Success!");
        isLocked = true;
        event.preventDefault();
    }

    const formatDate = (date: Date) => {
        return (date && format(new Date(date), "dd/MM/yyyy")) || "";
    };

    const toggleDatePicker = () => (isDateOpen = !isDateOpen);
</script>

<main class="p-4 mx-auto text-center max-w-xl">
    <Toaster />
    <div
        class="block max-w-sm sm:max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow"
    >
        <form class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="form-control">
                <label for="firstname"> Firstname: </label>
                <input
                    name="firstname"
                    placeholder="Firstname"
                    type="text"
                    bind:value={data.firstname}
                    disabled={isLocked}
                    required
                />
            </div>

            <div class="form-control">
                <label for="lastname"> Lastname: </label>
                <input
                    name="lastname"
                    placeholder="Lastname"
                    type="text"
                    bind:value={data.lastname}
                    disabled={isLocked}
                    required
                />
            </div>
            <div class="form-control">
                <label for="country"> Country: </label>
                <select
                    name="country"
                    bind:value={data.country}
                    required
                    disabled={isLocked}
                >
                    <option value="" selected disabled hidden
                        >Choose here</option
                    >
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                </select>
            </div>
            <div class="form-control">
                <label for="date"> Date: </label>
                <DatePicker
                    bind:isOpen={isDateOpen}
                    bind:startDate
                    theme="custom-datepicker"
                >
                    <input
                        type="text"
                        name="date"
                        placeholder="Select date"
                        on:click={toggleDatePicker}
                        bind:value={data.date}
                        disabled={isLocked}
                    />
                </DatePicker>
            </div>

            <div class="form-control">
                <label for="amount"> Max transfer amount: </label>
                <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    bind:value={data.amount}
                    disabled={isLocked}
                />
            </div>
        </form>

        <div class="flex flex-row-reverse pt-4">
            <button
                class="btn"
                type="submit"
                disabled={buttonDisabled || isLocked}
                on:click={handleSubmit}>Save</button
            >

            <div class="grow flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="terms"
                    bind:value={data.terms}
                    disabled={isLocked}
                />
                <label for="terms"> Internal transfer </label>
            </div>
        </div>
    </div>
</main>

<style lang="postcss">
    .btn {
        @apply inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-gray-100 focus:ring-1 disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2;
    }
    input[type="text"] {
        @apply flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring max-w-xs disabled:pointer-events-none disabled:opacity-50;
    }
    input[type="checkbox"] {
        @apply h-4 w-4 shrink-0 rounded-sm border shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50;
    }
    select {
        @apply rounded-md border shadow-sm bg-transparent h-9 text-sm pl-3 pr-6 py-1 w-full max-w-xs disabled:pointer-events-none disabled:opacity-50;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3E%3C/svg%3E");
        background-position: right 0.75rem center;
        background-repeat: no-repeat;
        background-size: 0.75em 0.75em;
        padding-right: 2.5rem;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: "";
    }
    select::-ms-expand {
        display: none;
    }
    label {
        @apply text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left;
    }
    .form-control {
        @apply mt-4 grid gap-2;
    }
    :global(.datepicker[data-picker-theme="custom-datepicker"]) {
        --datepicker-calendar-range-selected-background: #18181b;
    }
</style>
