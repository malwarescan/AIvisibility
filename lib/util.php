<?php
function esc($s){return htmlspecialchars($s, ENT_QUOTES,'UTF-8');}
function canonical($path='/'){return rtrim(NC_BASEURL,'/').$path;}
function nowISO(){return gmdate('c');}

