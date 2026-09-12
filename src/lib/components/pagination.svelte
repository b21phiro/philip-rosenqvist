<script lang="ts">

    import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/svelte";
    import {onMount} from "svelte";

    const DeviceSize = {
        Default: "",
        Small: "small",
    } as const;

    let { pagination = $bindable() } = $props();

    let previousPageNumber = $derived(() => {
       if (pagination.page > 1) {
           return pagination.page - 1;
       }  else {
           return 1;
       }
    });

    let nextPageNumber = $derived(() => {
        if (pagination.page < pagination.pageCount) {
            return pagination.page + 1;
        }  else {
            return pagination.pageCount;
        }
    });

    let firstPage = 1;
    let currentPage = $derived(pagination.page);
    let lastPage = $derived(pagination.pageCount);

    let isFirstPage = $derived(currentPage === firstPage);
    let isLastPage = $derived(currentPage === lastPage);
    let isCurrentPage = $derived((pageNumber: number) => currentPage === pageNumber);

    let deviceWidth = $state(0);
    let deviceSizeType = $derived(() => {
       if (deviceWidth <= 768) {
           return DeviceSize.Small;
       } else {
           return DeviceSize.Default;
       }
    });

    let canGoNumberOfPagesForward = $derived((numberOfPages: number) => {
        return currentPage + numberOfPages <= lastPage;
    });

    let canGoNumberOfPagesBackward = $derived((numberOfPages: number) => {
        return currentPage - numberOfPages >= firstPage;
    });

    onMount(() => deviceWidth = window.innerWidth);

</script>

<nav class="pagination {deviceSizeType()}">

    <a class="pagination--button pagination--button--previous"
       href="/blog?page={previousPageNumber()}"
       aria-disabled={isFirstPage}
    >
        <ChevronLeftIcon aria-hidden="true" />
        {#if deviceSizeType() === DeviceSize.Default}
            Previous
        {/if}
    </a>

    {#if !isFirstPage && canGoNumberOfPagesBackward(2)  }
        <a class="pagination--button pagination--button--numerical"
           href="/blog?page={ firstPage }"
        >
            { firstPage }
        </a>
    {/if}

    {#if canGoNumberOfPagesBackward(3) && deviceSizeType() === DeviceSize.Default }
        <a class="pagination--button pagination--button--numerical"
           href="/blog?page={ currentPage - 3 }"
        >
            ...
        </a>
    {/if}

    {#if !isFirstPage}
        <a class="pagination--button pagination--button--numerical"
           href="/blog?page={ previousPageNumber() }"
        >
            { previousPageNumber() }
        </a>
    {/if}

    <a class="pagination--button pagination--button--numerical"
       href="/blog?page={ currentPage }"
       aria-disabled="true"
       aria-current="true"
    >
        { currentPage }
    </a>

    {#if !isLastPage}
        <a class="pagination--button pagination--button--numerical"
           href="/blog?page={ nextPageNumber() }"
        >
            { nextPageNumber() }
        </a>
    {/if}

    {#if canGoNumberOfPagesForward(2) && deviceSizeType() === DeviceSize.Default }
        <a class="pagination--button pagination--button--numerical"
           href="/blog?page={ currentPage + 2 }"
        >
            ...
        </a>
    {/if}

    {#if canGoNumberOfPagesForward(3) && deviceSizeType() === DeviceSize.Default }
        <a class="pagination--button pagination--button--numerical"
           href="/blog?page={ lastPage }"
        >
            { lastPage }
        </a>
    {/if}

    <a class="pagination--button pagination--button--next"
       href="/blog?page={nextPageNumber()}"
       aria-disabled={isLastPage}
    >
        {#if deviceSizeType() === DeviceSize.Default}
            Next
        {/if}
        <ChevronRightIcon aria-hidden="true" />
    </a>

</nav>

<svelte:window on:resize={() => deviceWidth = window.innerWidth} />

<style>

    .pagination {
        display: flex;
        border-radius: 0.0625rem;
        overflow: hidden;
        width: fit-content;
        margin-inline: auto;
    }

    .pagination--button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 3rem;
        padding-inline: 1rem;
        gap: 0.5rem;
        font-size: 1rem;
        text-decoration: none;
        font-weight: 900;
        background-color: #151515;
    }

    .pagination--button--previous {
        padding-left: 0.5rem;
    }

    .pagination--button--next {
        padding-right: 0.5rem;
    }

    .pagination--button--numerical {
        position: relative;
    }
    
    .pagination--button--numerical[aria-current="true"] {
        color: #EA0708;
    }

    .pagination--button--numerical[aria-current="true"]::after {
        content: "";
        border: 0.125rem solid #981213;
        border-radius: .0625rem;
        position: absolute;
        width: 2rem;
        height: 2rem;
    }

</style>