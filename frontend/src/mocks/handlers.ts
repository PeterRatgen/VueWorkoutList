import { rest } from 'msw';

import { token, testData } from '../../tests/testData';

export const handlers = [
    rest.post('/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                token
            )
        );
    }),
    rest.post('/workout_history', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                "fdajidjf23lklviu"
            )
        );
    }),
    rest.get('/workouts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                testData
            )
        );
    }),
];
