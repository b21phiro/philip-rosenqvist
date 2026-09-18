<script lang="ts">

    import { ExternalLinkIcon } from "@lucide/svelte";

    let { text, href }: { text: string, href: string } = $props();

</script>

<a href="{ href }">
    { text }
    <ExternalLinkIcon size="16" aria-hidden="true" />
</a>