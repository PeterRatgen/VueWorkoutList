let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/documents/VueWorkoutList
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +11 frontend/src/views/WorkoutView.vue
badd +7 frontend/src/api/user.ts
badd +152 frontend/src/store/actions.ts
badd +67 frontend/src/store/mutations.ts
badd +7 frontend/src/store/mutation_types.ts
badd +0 frontend/src/store/index.ts
badd +52 frontend/src/api/workout.ts
badd +5 frontend/src/api/repetition.ts
badd +267 frontend/src/components/Workout.vue
badd +0 frontend/src/components/Repetition.vue
argglobal
%argdel
tabnew
tabnew
tabnew
tabnew
tabrewind
edit frontend/src/views/WorkoutView.vue
argglobal
balt frontend/src/views/WorkoutView.vue
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 11 - ((6 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 11
normal! 046|
lcd ~/documents/VueWorkoutList
tabnext
edit ~/documents/VueWorkoutList/frontend/src/components/Repetition.vue
argglobal
balt ~/documents/VueWorkoutList/frontend/src/components/Workout.vue
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 156 - ((34 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 156
normal! 029|
tabnext
edit ~/documents/VueWorkoutList/frontend/src/api/repetition.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 25 - ((24 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 25
normal! 017|
wincmd w
argglobal
if bufexists("~/documents/VueWorkoutList/frontend/src/api/workout.ts") | buffer ~/documents/VueWorkoutList/frontend/src/api/workout.ts | else | edit ~/documents/VueWorkoutList/frontend/src/api/workout.ts | endif
if &buftype ==# 'terminal'
  silent file ~/documents/VueWorkoutList/frontend/src/api/workout.ts
endif
balt ~/documents/VueWorkoutList/frontend/src/api/user.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 51 - ((28 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 51
normal! 039|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
tabnext
edit ~/documents/VueWorkoutList/frontend/src/store/actions.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 115 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 116 + 116) / 232)
argglobal
balt ~/documents/VueWorkoutList/frontend/src/store/mutations.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 180 - ((17 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 180
normal! 023|
wincmd w
argglobal
if bufexists("~/documents/VueWorkoutList/frontend/src/store/mutations.ts") | buffer ~/documents/VueWorkoutList/frontend/src/store/mutations.ts | else | edit ~/documents/VueWorkoutList/frontend/src/store/mutations.ts | endif
if &buftype ==# 'terminal'
  silent file ~/documents/VueWorkoutList/frontend/src/store/mutations.ts
endif
balt ~/documents/VueWorkoutList/frontend/src/store/actions.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 20 - ((1 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 20
normal! 04|
wincmd w
exe 'vert 1resize ' . ((&columns * 115 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 116 + 116) / 232)
tabnext
edit ~/documents/VueWorkoutList/frontend/src/store/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
argglobal
balt ~/documents/VueWorkoutList/frontend/src/store/mutation_types.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 3 - ((2 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 3
normal! 0
wincmd w
argglobal
if bufexists("~/documents/VueWorkoutList/frontend/src/store/mutation_types.ts") | buffer ~/documents/VueWorkoutList/frontend/src/store/mutation_types.ts | else | edit ~/documents/VueWorkoutList/frontend/src/store/mutation_types.ts | endif
if &buftype ==# 'terminal'
  silent file ~/documents/VueWorkoutList/frontend/src/store/mutation_types.ts
endif
balt ~/documents/VueWorkoutList/frontend/src/store/index.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 9 - ((8 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 9
normal! 040|
wincmd w
exe 'vert 1resize ' . ((&columns * 116 + 116) / 232)
exe 'vert 2resize ' . ((&columns * 115 + 116) / 232)
tabnext 3
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0&& getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOF
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
