<script setup lang="ts">
import type { ContactInfo, ProjectSummary } from '@/models';
import { getCurrentInstance, onMounted } from 'vue';

const instance = getCurrentInstance();

let contact: ContactInfo = {
    id: '1',
    github: 'https://github.com/AugustDG',
    linkedin: 'https://www.linkedin.com/in/augustomp/',
    email: 'contact@augustopinheiro.com'
}

let summaries: ProjectSummary[] = [{
    id: '1',
    title: 'Project 1',
    medium: 'Medium 1',
    year: 2021,
    images: [],
},
{
    id: '2',
    title: 'Project 2',
    medium: 'Medium 2',
    year: 2021,
    images: [],
},
{
    id: '3',
    title: 'Project 3',
    medium: 'Medium 3',
    year: 2021,
    images: [],
},
{
    id: '4',
    title: 'Project 4',
    medium: 'Medium 4',
    year: 2021,
    images: [],
},
{
    id: '5',
    title: 'Project 5',
    medium: 'Medium 5',
    year: 2021,
    images: [],
},
{
    id: '6',
    title: 'Project 6',
    medium: 'Medium 6',
    year: 2021,
    images: [],
},
{
    id: '7',
    title: 'Project 7',
    medium: 'Medium 7',
    year: 2021,
    images: [],
},
{
    id: '8',
    title: 'Project 8',
    medium: 'Medium 8',
    year: 2021,
    images: [],
},
{
    id: '9',
    title: 'Project 9',
    medium: 'Medium 9',
    year: 2021,
    images: [],
}
];

onMounted(() => {
    window.onresize = (ev: UIEvent) => {
        //resizeOutro();
    };

    assignRandomColorsToLinks();
    //resizeOutro();
});

function assignRandomColorsToLinks() {
    const links = document.querySelectorAll('a');

    links.forEach((link) => {
        const randomColor = Math.floor(Math.random() * 7);

        link.classList.add(`vhs-color-${randomColor}`);
    });
}

function resizeOutro() {
    let outroElement = instance?.refs?.outro as HTMLElement;

    outroElement?.style.setProperty('--outro-width', `${outroElement?.clientWidth}px`);

    instance?.proxy?.$forceUpdate();
}
</script>

<template>
    <div class="view-root">
        <div id="intro" class="non-project"><span class="underline">Augusto Pinheiro</span> is a game designer and general coding enthusiast based out of Montreal. He specializes in interactive media experiences, robotics, and creative development.</div>

        <div id="projects-wrapper">
            <table class="projects">
                <tr class="table-headings-row">
                    <th>Title</th>
                    <th>Medium</th>
                    <th>Year</th>
                </tr>

                <tr v-for="(summary, index) in summaries" :key="summary.id" :class="['vhs-bg-color-' + ((index % 7) + 1)]">
                    <td>{{ summary.title }}</td>
                    <td>{{ summary.medium }}</td>
                    <td>{{ summary.year }}</td>
                    <td>{{ summary.id }}</td>
                </tr>
            </table>
        </div>

        <div id="contact" class="non-project"><a target="_blank" :href="contact.github">github</a>, <a target="_blank" :href="contact.linkedin">linkedin</a>, <a target="_blank" :href="'mailto:' + contact.email">email</a></div>

        <!-- <div id="outro" ref="outro" class="non-project uppercase sans">Augusto Pinheiro</div> -->
    </div>
</template>

<style lang="scss" scoped>
.view-root {
    --page-padding: 2rem;
    --section-padding: 5rem;

    color: var(--home-contrast);
    background-color: var(--home-background);

    animation: fadeIn 1s ease-in-out;
}

.non-project {
    font-size: 3rem;
    line-height: 5.4rem;
}

#intro {
    padding: var(--page-padding);
    padding-bottom: 0;
}

#contact {
    padding-inline: var(--page-padding);
    padding-block: 0 var(--section-padding);

    line-height: 3.8rem;
}

#outro {
    font-size: calc(var(--outro-width) * 0.16 - var(--page-padding) *2);

    text-align: left;

    padding-inline: var(--page-padding);
    padding-block: calc(var(--outro-width) * 0.01 + var(--section-padding)) 0;
}

#projects-wrapper {
    width: 100%;

    margin-block: 8rem;

    font-size: 2.6rem;
    text-transform: uppercase;

    .projects {
        width: 100%;

        tr:first-of-type {
            text-transform: capitalize;

            font-size: 3rem;
        }

        tr {
            padding-left: calc(100vw / 2);
            margin-left: calc(100vw / 2);
            border-bottom: 3px solid var(--home-contrast);

            height: 0;

            transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, height 0.3s ease-in-out;
            transition-delay: 0s;

            &:not(:hover) {
                background-color: var(--home-background) !important;
                color: var(--home-contrast) !important;
            }

            &:hover:not(.table-headings-row) {
                height: 10rem;
                cursor: pointer;
            }
        }

        th,
        td {
            text-align: left;
            padding: 0 var(--page-padding);
        }
    }
}
</style>
