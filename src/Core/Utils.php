<?php namespace Phro\Web\Core;

class Utils {

    public static function appendToStr(string $appendant, string & $strSubject): void {
        if (str_ends_with($strSubject, $appendant)) {
            return;
        }
        $strSubject .= $appendant;
    }

}