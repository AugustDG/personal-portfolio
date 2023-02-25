<script setup lang="ts">
import type { ProjectSummary } from '@/models';
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();

let summaries: ProjectSummary[] = [{
    id: '1',
    title: 'Project 1',
    medium: 'Medium 1',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '2',
    title: 'Project 2',
    medium: 'Medium 2',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '3',
    title: 'Project 3',
    medium: 'Medium 3',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '4',
    title: 'Project 4',
    medium: 'Medium 4',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '5',
    title: 'Project 5',
    medium: 'Medium 5',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '6',
    title: 'Project 6',
    medium: 'Medium 6',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '7',
    title: 'Project 7',
    medium: 'Medium 7',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '8',
    title: 'Project 8',
    medium: 'Medium 8',
    year: 2021,
    images: [],
    hovered: false,
},
{
    id: '9',
    title: 'Project 9',
    medium: 'Medium 9',
    year: 2021,
    images: [],
    hovered: false,
}
];

function summaryHovered(summaryIndex: number) {
    summaries[summaryIndex].hovered = true;

    summaries.splice(summaryIndex, 1, summaries[summaryIndex]);

    instance?.proxy?.$forceUpdate();
}
</script>

<template>
    <div class="view-root">
        <div id="intro"><span class="underline">Augusto Pinheiro</span> is a game designer and general coding enthusiast based out of Montreal / Tiohtià:ke. He specializes in interactive media experiences, robotics, and creative development.</div>

        <div class="projects-wrapper">
            <table class="projects">
                <tr class="table-headings-row">
                    <th>Title</th>
                    <th>Medium</th>
                    <th>Year</th>
                </tr>

                <tr v-for="(summary, index) in summaries" :key="summary.id" :class="[summary.hovered ? 'hovered' : '', 'color-' + (index % 5)]" @mouseenter="summaryHovered(index)">
                    <td>{{ summary.title }}</td>
                    <td>{{ summary.medium }}</td>
                    <td>{{ summary.year }}</td>
                    <td>{{ summary.id }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.view-root {
    --page-padding: 2rem;

    color: var(--home-contrast);
    background-color: var(--home-background);

    animation: fadeIn 1s ease-in-out;
}

#intro {
    padding: var(--page-padding);

    font-size: 3rem;
    line-height: 5.4rem;
}

.projects-wrapper {
    width: 100%;

    margin-top: 8rem;

    font-size: 2.6rem;
    text-transform: uppercase;

    .projects {
        width: 100%;

        tr:first-of-type {
            text-transform: capitalize;

            font-size: 3rem;
        }

        tr {
            border-bottom: 3px solid var(--home-contrast);

            height: 0;

            transition: background-color 2s ease-in-out, height 0.5s ease-in-out;
            transition-delay: 0s;

            &.hovered {
                height: 10rem;

                &.color-0 {
                    background-color: var(--vhs-one);
                }

                &.color-1 {
                    background-color: var(--vhs-two);
                }

                &.color-2 {
                    background-color: var(--vhs-three);
                }

                &.color-3 {
                    background-color: var(--vhs-four);
                }

                &.color-4 {
                    background-color: var(--vhs-five);
                }
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
