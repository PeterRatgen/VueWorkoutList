import { rest } from 'msw';

import { token, testData } from '../../tests/testData';

export const handlers = [
    rest.post('http://locahost:3001/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                token
            )
        );
    }),
    rest.post('http://localhost:3001/workout_history', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                "fdajidjf23lklviu"
            )
        );
    }),
    rest.get('http://localhost:3001/workouts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                testData
            )
        );
    }),
];
