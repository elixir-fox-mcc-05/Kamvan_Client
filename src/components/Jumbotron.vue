<template>
    <div class="jumbotron">
        <div class="svg">
            <img src="../../assets/kanban-board.svg" alt="kanban-landing-image">
        </div>
        <div class="greet">
            <div class="logo-kanban">
                <img src="../../assets/kanban-blue.png" alt="kanban-logo">
            </div>
            <h1>Manage Your Team and Reach Your Highest Productivity With Us</h1>
            <button class="btn btn-lg button-landing" @click="showModal">JOIN NOW</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Jumbotron',
    methods: {
        showModal() {
            this.$emit('modal');
        }
    }
}
</script>

<style scoped>
    .jumbotron {
        margin: 0;
        padding: 0;
        height: 100vh;
        display: grid;
        grid-template-columns: 55% 45%;
        background-color: white;
    }

    .svg {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 85%;
    }

    h1 {
        text-shadow: 1px 2px 3px #5E5E5E;
    }

    .greet {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-family: 'Lora', serif;
    }

    .button-landing {
        margin-top: 30px;
        background-color: #3071b8;
        border-color:  #3071b8;
        color: white;
    }

    .button-landing:hover {
        background-color: #22568f;
    }

    .logo-kanban {
        width: 100%;
    }

    .logo-kanban img {
        width: 65%;
    }
</style>